import * as shell from "shelljs";

shell.cp("-R", "src/public/javascripts/lib", "dist/public/javascripts/");
shell.cp("-R", "src/public/images", "dist/public/");