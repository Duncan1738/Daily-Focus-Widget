// Daily Focus Widget by Duncan Kibet

const testMode = true
const widgetPreview = "large"

const showGreeting = true
const showEvents = true
const numberOfEvents = 3
const showQuote = true
const signature = "Created by Duncan Kibet"

const verticalAlignment = "middle"
const horizontalAlignment = "left"
const fontName = "Futura-Medium"
const fontColor = new Color("#ffffff")
const elementSpacing = 12

const greetingSize = 18
const dateSize = 22
const eventTitleSize = 14
const eventTimeSize = 11
const quoteSize = 13
const signatureSize = 10

const date = new Date()
const files = FileManager.local()
const gradient = new LinearGradient()
gradient.colors = [new Color("#141e30"), new Color("#243b55")]
gradient.locations = [0, 1]

if (config.runsInWidget || testMode) {
  const widget = new ListWidget()
  widget.backgroundGradient = gradient

  if (verticalAlignment === "middle" || verticalAlignment === "bottom") widget.addSpacer()

  if (showGreeting) {
    const greeting = widget.addText(makeGreeting())
    formatText(greeting, greetingSize)
    widget.addSpacer(elementSpacing)
  }

  const dateText = widget.addText(formatDate())
  formatText(dateText, dateSize)
  widget.addSpacer(elementSpacing)

  if (showEvents) {
    const events = await CalendarEvent.today([])
    const upcoming = events.filter(e => !e.title.startsWith("Canceled")).slice(0, numberOfEvents)
    if (upcoming.length === 0) {
      const none = widget.addText("🎉 No events today")
      formatText(none, eventTitleSize)
    } else {
      for (let ev of upcoming) {
        widget.addSpacer(6)
        const title = widget.addText("• " + ev.title)
        formatText(title, eventTitleSize)
        if (!ev.isAllDay) {
          const time = widget.addText("   " + formatTime(ev.startDate))
          formatText(time, eventTimeSize)
        }
      }
    }
    widget.addSpacer(elementSpacing)
  }

  if (showQuote) {
    const quote = widget.addText("💡 “Focus on progress, not perfection.”")
    formatText(quote, quoteSize)
    widget.addSpacer(elementSpacing)
  }

  const credit = widget.addText(signature)
  formatText(credit, signatureSize)
  credit.textOpacity = 0.5

  if (verticalAlignment === "top" || verticalAlignment === "middle") widget.addSpacer()
  Script.setWidget(widget)
  if (testMode) {
    if (widgetPreview === "small") widget.presentSmall()
    else if (widgetPreview === "medium") widget.presentMedium()
    else widget.presentLarge()
  }
  Script.complete()
}

// === HELPER FUNCTIONS ===

function makeGreeting() {
  const hour = date.getHours()
  if (hour < 12) return "☀️ Good morning"
  if (hour < 18) return "🌤 Good afternoon"
  return "🌙 Good evening"
}

function formatDate() {
  const df = new DateFormatter()
  df.dateFormat = "EEEE, MMMM d"
  return "📆 " + df.string(date)
}

function formatTime(time) {
  const tf = new DateFormatter()
  tf.dateFormat = "h:mm a"
  return tf.string(time)
}

function formatText(txt, size) {
  txt.font = fontName ? new Font(fontName, size) : Font.systemFont(size)
  txt.textColor = fontColor
  if (horizontalAlignment === "center") txt.centerAlignText()
  else if (horizontalAlignment === "right") txt.rightAlignText()
  else txt.leftAlignText()
}
