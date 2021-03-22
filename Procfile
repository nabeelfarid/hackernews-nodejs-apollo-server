web: npm start

release: heroku restart && heroku pg:reset DATABASE --confirm hackernews-server-nf && npx prisma migrate deploy && node src/script.js 