http://localhost:3000 (slides)

http://localhost:3000/control.html

config.yml:
```
url: http://localhost:3000
tunnel: 1acedb5a-64b9-45cf-9f6b-799acd66a059
credentials-file: /Users/homam/.cloudflared/1acedb5a-64b9-45cf-9f6b-799acd66a059.json
```


```
cloudflared tunnel --config config.yml run live
```
(live for live.homam.me)