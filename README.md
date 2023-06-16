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

`deps/`: Hoon dependencies are pasted into this directory. None of the code here is original to this project.

`ui/`: Source code for the React.js frontend.

`desk`: Contains the name of the desk. App will run and be distributed with this desk name.

`_sync.sh`: Continuously syncs project files with a desk in a pier.

`_dist.sh`: Copies project files into your ship's pier.

`_build.sh`: Builds the React frontend. `ui/dist` can be uploaded as a glob.

-----
## Running the app:

Unix:
* `./_sync.sh PATH/TO/PIER` to sync `src/` and `deps/` to your dev ship's pier.
* In `ui/` run `npm run dev`
  * or `npm run dev:env foo` to use `ui/.env.foo.local` as config

Dojo:
* `|commit %whom` to build your desk
* `|install our %whom` to install your desk and start the app for the first time

-----
## Distributing the app:

* `./_dist.sh PATH/TO/PIER` to copy `src/` and `deps/` to your distribution ship's pier.
* Dojo: `|commit %whom`
* `./_build.sh` to build the React frontend
* Upload `ui/dist` to the %docket globulator at `<distro ship hostname>/docket/upload`
