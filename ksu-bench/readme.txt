Steps to Run SonarQube with Authentication Disabled & Scan Any Project
1. Run SonarQube in Docker with Authentication Disabled

To disable authentication for scanning, we need to:

Run SonarQube in a Docker container.
Modify SonarQube settings to allow anonymous scans.
Run SonarQube Using Docker
docker run -d --name sonarqube \
  -p 9000:9000 \
  -e SONAR_FORCEAUTHENTICATION=false \
  sonarqube:lts
✅ This runs SonarQube without requiring authentication for scans.

2. Allow Anonymous Scanning in SonarQube

Even though we disabled forced authentication, we still need to manually allow anonymous scans in the UI.

Steps to Enable Anonymous Access:
Open SonarQube Dashboard → http://localhost:9000.
Log in with:
Username: admin
Password: admin
Go to → Administration → Security → Global Permissions.
Find "Anyone" and enable "Execute Analysis".
Click Save.
Now, you can scan projects without authentication! 🚀

3. Terminal Command to Scan Any Project

Now, go to your project root directory and run:

sonar-scanner -Dsonar.projectKey=my-project -Dsonar.sources=. -Dsonar.host.url=http://localhost:9000 -Dsonar.qualitygate.wait=true -Dsonar.java.binaries=.