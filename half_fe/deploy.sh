echo "Building app..."
npm run build

echo "Deploy files to server..."
scp -r -i "C:\Users\DELL\OneDrive\Máy tính\art" dist/* root@167.172.92.40:/var/www/html/
echo "Done!"
