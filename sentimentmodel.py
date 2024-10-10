from transformers import pipeline

# pre-trained model
sentiment_pipeline = pipeline('sentiment-analysis')

def analyze_sentiment(text):
    result = sentiment_pipeline(text)
    return result[0]['label'], result[0]['score']