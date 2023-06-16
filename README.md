# %whom

An app for managing your contacts and profile on [Urbit](https://urbit.org).

-----

[Overview](./src/doc/overview.udon)

[Changelog](./src/doc/changelog.udon)

Documentation and release notes can also be viewed in the [%docs](https://github.com/tinnus-napbus/docs-app) app.

[Urbit Foundation Grant](https://urbit.org/grants/whom)

-----
## Project Structure:

`src/`: Hoon source code. All code here is original and specific to this project.

`deps/`: Hoon dependencies from other projects are pasted into this directory. None of the code here is original to this project.

`ui/`: Source code for the React.js frontend.

`desk`: Contains the name of the desk. App will run and be distributed with this desk name.

`_sync.sh`: Script for syncing project files into a dev desk in a pier.

`_build.sh`: Run this in your **dev** environment. Copies the built desk from a dev ship, and builds the React frontend. The `/.build` dir should not be commited except to a `build` branch.

`_dist.sh`: Run this in your **distribution** environment on a `build` branch. Copies contents of `.build` to your distribution ship's pier.

-----
## Running the app:

Unix:
* `./_sync.sh PATH/TO/PIER` to sync `src/` and `deps/` to your dev desk.
* In `ui/` run `npm run dev`
  * or `npm run dev:env foo` to use `ui/.env.foo.local` as config

Dojo:
* `|commit %whom` to build your desk via Herd.
* `|install our %whom` to install your desk and start the app for the first time
