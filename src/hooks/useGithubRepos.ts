import { useCallback, useEffect, useState } from 'react';

export type GithubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  topics: string[];
  fork: boolean;
  archived: boolean;
};

type GithubProfile = { followers: number };
type GithubResult = { repos: GithubRepo[]; followers: number };
const CACHE_KEY = 'saad-github-cache-v1';
const CACHE_TIME = 10 * 60 * 1000;

function readCache(): GithubResult | null {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? 'null');
    return cached && Date.now() - cached.timestamp < CACHE_TIME ? cached.data : null;
  } catch { return null; }
}

export function useGithubRepos() {
  const [data, setData] = useState<GithubResult | null>(() => readCache());
  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async (force = false) => {
    if (!force) {
      const cached = readCache();
      if (cached) { setData(cached); setLoading(false); return; }
    }
    setLoading(true);
    setError(false);
    try {
      const [reposResponse, profileResponse] = await Promise.all([
        fetch('https://api.github.com/users/Achahbounsaadallah/repos?per_page=100&sort=updated'),
        fetch('https://api.github.com/users/Achahbounsaadallah'),
      ]);
      if (!reposResponse.ok || !profileResponse.ok) throw new Error('GitHub request failed');
      const repos = (await reposResponse.json() as GithubRepo[])
        .filter((repo) => !repo.fork && !repo.archived && repo.name !== 'Achahbounsaadallah')
        .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
      const followers = (await profileResponse.json() as GithubProfile).followers;
      const result = { repos, followers };
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: result }));
      setData(result);
    } catch { setError(true); } finally { setLoading(false); }
  }, []);

  useEffect(() => { if (!data) void fetchData(); }, [data, fetchData]);
  return { ...(data ?? { repos: [], followers: 0 }), loading, error, retry: () => fetchData(true) };
}
