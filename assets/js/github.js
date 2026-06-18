/* GitHub repository preview loader. */
async function loadGithubRepos() {
  const repoGrid = document.getElementById('githubRepos');
  if (!repoGrid) return;

  repoGrid.innerHTML = '<p class="profile-copy">Loading GitHub repos…</p>';

  try {
    const response = await fetch('https://api.github.com/users/surajkumarchauhan/repos?sort=updated&per_page=6');
    if (!response.ok) throw new Error('GitHub fetch failed');

    const repos = await response.json();
    if (!repos.length) throw new Error('No repos available');

    repoGrid.innerHTML = repos
      .map((repo) => `
        <article class="github-repo-card mb-3">
          <a href="${repo.html_url}" target="_blank" rel="noreferrer" class="d-block">
            <div class="repo-name"><i class="bi bi-github"></i> ${repo.name}</div>
            <p class="repo-desc">${repo.description || 'Open source project'}</p>
            <div class="repo-meta">
              <span>${repo.stargazers_count} stars</span>
              <span>${repo.forks_count} forks</span>
            </div>
          </a>
        </article>
      `)
      .join('');
  } catch (error) {
    repoGrid.innerHTML = '<p class="profile-copy">Unable to load GitHub repositories. Visit the profile directly.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadGithubRepos);
