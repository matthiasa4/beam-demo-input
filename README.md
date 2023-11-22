# Deployment

You can simply deploy this app by using `gcloud`:
```bash
export GCP_ACCOUNT=xxx # Set your GCP username
export GCP_PROJECT=yyy # Set your GCP project
export GCP_REGION=zzz # GCP region where you want to deploy the app
gcloud app create --account=$GCP_ACCOUNT --project=$GCP_PROJECT --region=$GCP_REGION
gcloud app deploy --account=$GCP_ACCOUNT --project=$GCP_PROJECT
```