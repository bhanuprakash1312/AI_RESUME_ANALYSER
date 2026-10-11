from sentence_transformers import SentenceTransformer

MODEL_NAME = "shankerram3/resumator"

model = SentenceTransformer(
    MODEL_NAME,
    truncate_dim=384
)