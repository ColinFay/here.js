const os = require('os');
const process = require('process');
const path = require('path');
const fs = require('fs');

const { here, set_here } = require("../src/here.js")

const start_dir = process.cwd()
const temp_dir = os.tmpdir();

test("default here is wd", () => {
    // In the beginning, we expect here
    // to be the working directory
    expect(
        here(".", 1)
    ).toBe(process.cwd())
})

test("changing here works", () => {

    // we'll move to the tempdir and play there
    const temp_here = path.join(temp_dir, ".here");

    // when running several tests, the tempdir is still the  same
    // so we unlink the .here 
    if (fs.existsSync(temp_here)) {
        fs.unlinkSync(temp_here)
    }

    // move there
    process.chdir(temp_dir);

    // there should be no here
    expect(
        here(".", 1)
    ).toBe(".")
    expect(
        here("thisfile.js", 1)
    ).toBe("thisfile.js")

    // Setting the here
    set_here(temp_dir);

    // Now we have a here
    expect(
        here(".", 1)
    ).toMatch(temp_dir)

    // Creating a subpath, and move to it
    const new_path = path.join(temp_dir, "pouetpouet");

    if (fs.existsSync(new_path)) {
        fs.rmSync(new_path, { recursive: true });
    }

    fs.mkdirSync(new_path)

    process.chdir(new_path);

    // We haven't set the here so it should still be the same
    expect(
        here(".", 2)
    ).toMatch(temp_dir)

    // Now that we have set the here, the new here should be inside 
    // the subfolder
    set_here(new_path);

    expect(
        here(".", 2)
    ).toMatch(new_path)

})

afterAll(() => {
    process.chdir(start_dir);
});