import axios from 'axios';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const username = 'ChrisRistoff';
const token = process.env.GH_TOKEN;

console.log('Token:', token);

const repos = [];

async function fetchRepos(username) {
  try {
    const response = await axios.get(`https://api.github.com/users/ChrisRistoff/repos`, {
      headers: {
        'Authorization': `token ${token}`
      }
    });

    for (let i = 0; i < response.data.length; i++) {
      repos.push({repo : response.data[i].name, owner : response.data[i].owner.login});
    }
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
}

async function fetchPrivateRepos() {
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await axios.get(`https://api.github.com/user/repos?type=all&per_page=100&page=${page}`, {
        headers: {
          'Authorization': `token ${token}`
        }
      });

      console.log(response.data.length);

      if (response.data.length > 0) {
        for (let i = 0; i < response.data.length; i++) {
          repos.push({repo : response.data[i].name, owner : response.data[i].owner.login});
        }
        page++; // Prepare to fetch the next page
      } else {
        // No more repos, stop the loop
        hasMore = false;
      }
    } catch (error) {
      console.error(`Error fetching repositories on page ${page}:`, error);
      hasMore = false; // Stop on error
    }
  }

  return repos;
}



async function fetchContributionsForRepo(username, repo, config) {
  let attempts = 0;
  while (attempts < 10) {
    try {
      const response = await axios.get(`https://api.github.com/repos/${username}/${repo}/stats/contributors`, {
        headers: {
          'Authorization': `token ${token}`
        }
      });
      if (response.status === 200) {
        const userStats = response.data.find(stat => stat.author.login.toLowerCase() === username.toLowerCase());
        return userStats ? userStats.weeks : [];
      } else if (response.status === 202) {
        console.log(`Data for ${repo} by ${username} is being prepared. Retry in a moment.`);
        await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for 3 seconds before retrying
        attempts++;
        continue;
      }
    } catch (error) {
      console.error(`Error fetching contributions for ${repo.repo} by ${repo.owner}:`, error.response?.status, error.response?.statusText);
      return [];
    }
  }
  console.log(`Failed to fetch contributions for ${repo} after retries.`);
  return [];
}


async function aggregateStats(username) {
  // await fetchRepos(username);
  await fetchPrivateRepos(username);

  console.log('Repos:', repos);
  console.log('Number of repos:', repos.length);
  let totalLinesAdded = 0;
  let totalLinesDeleted = 0;
  let totalCommits = 0;

  for (const repo of repos) {
    console.log(`Fetching stats for ${repo.repo} by ${repo.owner}`);
    const contributions = await fetchContributionsForRepo(repo.owner, repo.repo);
    contributions.forEach(week => {
      totalLinesAdded += week.a;
      totalLinesDeleted += week.d;
      totalCommits += week.c;
    });
  }

  return {
    username,
    totalLinesAdded,
    totalLinesDeleted,
    totalCommits,
    numberOfRepositories: repos.length
  };
}

aggregateStats(username).then(stats => {
  console.log(stats);
  fs.writeFileSync('githubStats.json', JSON.stringify(stats, null, 2), 'utf-8');
}).catch(error => {
  console.error('Failed to aggregate stats:', error);
});
