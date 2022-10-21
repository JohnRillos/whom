# %whom - Contacts

`%whom` is an app for managing your contacts and profile on [Urbit](https://urbit.org).

[Overview](./src/doc/overview.udon)

[Changelog](./src/doc/changelog.udon)

Documentation and release notes can also be viewed in the [%docs](https://github.com/tinnus-napbus/docs-app) app.

-----
## Project Structure:

`src/`: Hoon source code. All code here is original and specific to this project.

`deps/`: Hoon dependencies that can't be imported via [Herd](./src/desk.herd) are pasted into this directory. None of the code here is original to this project.

`ui/`: Source code for the React.js frontend.

`dev_desk`: Contains the name of the dev desk used by Herd.

`sync.sh`: Script for syncing project files into a dev desk in a pier.

-----
## Running the app:

Unix:
* `./sync.sh PATH/TO/PIER` to sync `src/` and `deps/` to your dev desk.
* In `ui/` run `npm run dev`
  * or `npm run dev:env foo` to use `ui/.env.foo.local` as config

Dojo:
* `-citadel!commit [%whom-dev %whom]` to build your desk via Herd.
  * `%citadel` must be installed first
* `|install our %whom` to install your desk and start the app for the first time
