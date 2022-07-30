# Template for Urbit projects

## 1) Create a new desk for your ship
* Boot a ship to use for development
* Create and mount a new desk (in Dojo)
    ```
    |merge %mydesk our %base
    |mount %mydesk
    ```
* Delete the contents of the desk in your pier (in Bash)
    ```
    rm -r PATH/TO/PIER/mydesk/*
    ```

* `PATH/TO/PIER` : the pier of the ship you're developing on

---

## 2) Import a base dev desk

Import a dev desk to use as a base for your project's `/base` directory.

```
./_import_base.sh
```
This command will clone the [Urbit](https://github.com/urbit/urbit) repository to `/.urbit` and use it to build  `/base`.

If you already have the Urbit repo cloned on your machine, you can include the path to it:

```
./_import_base.sh PATH/TO/URBIT/REPO
```

`/base` serves as the base for your app's desk, kept in a separate directory from your main source files to reduce clutter.
* Your main source files are in `/src`, and will be used to build your app's desk, on top of `/base`.
* Files in `/base` should not be edited, however you can override any file in `/base` by providing a file with the same name in `/src`.

---

## 3) Set your desk's name
Edit the contents of the `desk_name` file to your desk's name.

---
## 4) Sync your project files to your pier
Bash:
```
bash ./_sync.sh PATH/TO/PIER
```

Dojo:
```
|commit %my-desk
```