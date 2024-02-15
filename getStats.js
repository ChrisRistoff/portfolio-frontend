import axios from 'axios';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const username = 'ChrisRistoff';
const token = process.env.GH_TOKEN;

// initialize the repos array
const repos = [];


async function fetchRepos() {

  // set page
  let page = 1;

  // set hasMore to true to start the loop
  let hasMore = true;

  while (hasMore) {

    try {

      // fetch the repos
      const response = await axios.get(`https://api.github.com/user/repos?type=all&per_page=100&page=${page}`, {
        headers: {
          'Authorization': `token ${token}`
        }
      });

      // if the response has data
      if (response.data.length > 0) {

        // loop through the data and push the repo name and owner to the repos array
        for (let i = 0; i < response.data.length; i++) {
          repos.push({repo : response.data[i].name, owner : response.data[i].owner.login});
        }

        // increment the page
        page++;

      } else {

        // stop the loop when there is no more data
        hasMore = false;
      }

    } catch (error) {
      console.error(`Error fetching repositories on page ${page}:`, error);

      // stop the loop on error
      hasMore = false;
    }
  }

  console.log("repos scraped: ", repos.length);
}



async function fetchContributionsForRepo(username, repo) {

  // set the number of attempts to 0
  let attempts = 0;

  // loop for 10 attempts
  while (attempts < 10) {

    try {

      // fetch the contributions
      const response = await axios.get(`https://api.github.com/repos/${username}/${repo}/stats/contributors`, {
        headers: {
          'Authorization': `token ${token}`
        }
      });

      // if the response is 200
      if (response.status === 200) {

        // find the user stats
        const userStats = response.data.find(stat => stat.author.login.toLowerCase() === username.toLowerCase());

        // return the weeks array
        return userStats ? userStats.weeks : [];

        // if the response is 202
      } else if (response.status === 202) {

        // log the message and wait for 3 seconds
        console.log(`Data for ${repo} by ${username} is being prepared. Retry in a moment.`);
        await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for 3 seconds before retrying

        // increment the attempts
        attempts++;

        // continue to the next iteration
        continue;
      }

    } catch (error) {

      // log the error
      console.error(`Error fetching contributions for ${repo.repo} by ${repo.owner}:`, error.response?.status, error.response?.statusText);
    }
  }

  console.log(`Failed to fetch contributions for ${repo} after retries.`);
}


async function aggregateStats(username) {

  // fetch all repos for the user
  await fetchRepos(username);

  // initialize the stats
  let totalLinesAdded = 0;
  let totalLinesDeleted = 0;
  let totalCommits = 0;

  // loop through the repos
  for (const repo of repos) {

    console.log(`Fetching stats for ${repo.repo} by ${repo.owner}`);

    // fetch the contributions for the repo
    const contributions = await fetchContributionsForRepo(repo.owner, repo.repo);

    // initialize the stats for the repo
    let totalLinesAddedForRepo = 0;
    let totalLinesDeletedForRepo = 0;

    // loop through the contributions
    contributions.forEach(week => {

      // add the stats to the repo stats
      totalLinesAdded += week.a;
      totalLinesDeleted += week.d;
      totalCommits += week.c;

      // add the stats to the user stats to print out
      totalLinesAddedForRepo += week.a;
      totalLinesDeletedForRepo += week.d;
    });

    console.log("-------------------------------------------------")
    console.log(`Stats for ${repo.repo} by ${repo.owner}:`);
    console.log(`Total lines added: ${totalLinesAddedForRepo}`);
    console.log(`Total lines deleted: ${totalLinesDeletedForRepo}`);
    console.log("-------------------------------------------------")
  }

  // return the stats
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
