gulp:
	gulp
merge:
	git fetch seed template
	git merge remotes/seed/template
push:
	git push coding master
	git push coding template