#  Daily Focus Widget

A customizable productivity widget for iOS using [Scriptable](https://scriptable.app/).  
Displays a friendly greeting, today's date, your upcoming events, and a motivational quote.

---

##  Features

- Dynamic greeting based on the time of day 
- Current date display  
- Shows your next 3 calendar events   
- Daily motivational quote  
- Subtle author credit "Created by Duncan Kibet"

---

##  How to Install

1. **Install [Scriptable app](https://apps.apple.com/app/scriptable/id1405459188)** on your iPhone.
2. Copy the contents of [`daily_focus_widget.js`](daily_focus_widget.js)
3. Open Scriptable → Tap `+` → Paste the script → Save as `Daily Focus Widget`

---

## Optional: Auto-load from GitHub

If you want the widget to always use the latest version:

1. Create a new script in Scriptable:
```js
let url = "https://raw.githubusercontent.com/Duncan1738/Daily-Focus-Widget/main/daily_focus_widget.js"
let code = await new Request(url).loadString()
eval(code)
