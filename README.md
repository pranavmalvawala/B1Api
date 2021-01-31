# B1Api
Data access layer for B1.church

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
#### Join us on [Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg).

### Dev Setup Instructions

1. Create a MySQL database named `b1`.
2. Copy `dotenv.sample.txt` to `.env` and edit it to point to your MySQL database.
3. Pull the [apiBase](https://github.com/LiveChurchSolutions/ApiBase) submodule with: `git submodule init && git submodule update`
4. Install the dependencies with: `npm install`
5. Create the database tables with `npm run initdb`
6. Start the api with `npm run dev`
