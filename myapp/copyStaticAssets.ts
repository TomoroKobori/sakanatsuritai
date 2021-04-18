import * as shell from "shelljs";

shell.cp("-R", "src/public/javascripts/", "dist/public/javascripts/");
shell.cp("-R", "src/public/images", "dist/public/");