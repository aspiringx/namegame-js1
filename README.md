## Quick start
1. Clone repo `git clone https://github.com/aspiringx/namegame-js1.git`
2. Run `npm install`
3. Copy `.env.example` as `.env` and populate the database environmental variables.
	  ***NOTE: Node server defaults to port 3000. MYSQL_PORT defaults to 3306.***
4. ***(Optional)*** To build and populate a working development database use the following.
	  *From the project root folder*
	  - `docker compose -f ./docker-mysql-dev.yaml up -d`
	  ***NOTE:*** This creates a simple mysql container with the `MYSQL_` `.env` variable values.
	  - `npm run migration:run` will build out the database schema.
	  - `npm run schema:seed` will populate the `users`, `groups` and `group_users` tables.
5. Run `npm run watch` to start server in hot reload dev mode.

## DB: Schema
- To build the database schema use the command `npm run migration:run`
- To rebuild the database in case of an entity / schema problem use:
	- `npm run schema:drop` followed by `npm run migration:run`

## DB: Seeding
- To populate the database the command `npm run schema:seed`
	- ***NOTE: Seeder will populate the following tables only if currently empty***
		- Users - 1000 rows with random null email and phone verification dates.
		- Groups - 150 rows and some with a parent_id pointing to another group.
		- GroupUsers - ~10k rows linked to existing users / groups.

## TODO
The app is stable for branching as of commit [00844a1](https://github.com/aspiringx/namegame-js1/commit/00844a1874a5214f99d8dfa27f00e4cfdf379a3b) - The following list are the planned tasks to make the app production ready:
- API call response structure.
- Error handling policy between controller, service and repository layers.
- Secure app via auth protocol (JWT maybe).
- Integrate the GraphQL API query layer into the app flow.
- Unit testing.
- Create additional API endpoints once app functionality is better defined.
- Containerize application to mainstream environment compatibility.
