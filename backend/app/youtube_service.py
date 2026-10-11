
import os

import requests
from dotenv import load_dotenv

load_dotenv()

YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search"


def search_learning_videos(skill: str, max_results: int = 3):
    if not YOUTUBE_API_KEY:
        raise RuntimeError("YOUTUBE_API_KEY is not configured.")

    params = {
        "part": "snippet",
        "q": f"{skill} tutorial for beginners",
        "type": "video",
        "maxResults": max_results,
        "order": "relevance",
        "key": YOUTUBE_API_KEY,
    }

    response = requests.get(
        YOUTUBE_SEARCH_URL,
        params=params,
        timeout=15,
    )
    response.raise_for_status()

    data = response.json()
    videos = []

    for item in data.get("items", []):
        video_id = item["id"]["videoId"]
        snippet = item["snippet"]

        videos.append({
            "video_id": video_id,
            "title": snippet["title"],
            "channel": snippet["channelTitle"],
            "description": snippet["description"],
            "thumbnail": snippet["thumbnails"].get(
                "medium", snippet["thumbnails"]["default"]
            )["url"],
            "url": f"https://www.youtube.com/watch?v={video_id}",
        })

    return videos
