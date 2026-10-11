from .model import model


def calculate_match_score(
    job_description: str,
    resume_text: str
):
    embeddings = model.encode(
        [job_description, resume_text],
        normalize_embeddings=True
    )

    similarity = float(
        embeddings[0] @ embeddings[1]
    )

    # Convert similarity into an application score.
    score = (similarity - 0.30) / 0.50 * 100

    score = max(0, min(100, round(score)))

    return {
        "match_score": score,
        "raw_similarity": round(similarity, 4)
    }