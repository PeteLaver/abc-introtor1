
library(echarts4r)

live_gauge <- function(id, value = 0, name = ".", color = "#c45426", 
                       height = "470px") {
  e_charts(elementId = id, width = "100%", height = height) |>
    e_gauge(
      value = value, name = name, min = 0, max = 100,
      startAngle = 90, endAngle = -270,
      center = list("50%", "60%"),                 # push the arc's centre down
      progress = list(show = TRUE, width = 32, itemStyle = list(color = color)),
      axisLine = list(lineStyle = list(width = 32, color = list(list(1, "#c4542620")))),
      pointer = list(show = FALSE), axisTick = list(show = FALSE),
      splitLine = list(show = FALSE), axisLabel = list(show = FALSE),
      title = list(show = TRUE, fontSize = 40, fontWeight = "bold",
                   color = "#4a5568", offsetCenter = list(0, "20%")),
      detail = list(valueAnimation = TRUE, formatter = "{value}%",
                    offsetCenter = list(0, "-20%"), fontSize = 50),
      animation = TRUE
    )
}

live_bar <- function(id, value = 0, name = ".", color = "#c45426",
                     height = "170px", bar_width = 40) {
  e_charts(elementId = id, width = "100%", height = height) |>
    e_list(list(
      animation = TRUE,
      grid = list(left = 0, right = 110, top = 60, bottom = 5),
      title = list(
        text = name, left = 0, top = 0,
        textStyle = list(fontSize = 40, fontWeight = "bold", color = "#4a5568")
      ),
      xAxis = list(type = "value", min = 0, max = 100, show = FALSE),
      yAxis = list(type = "category", data = list(""), show = FALSE),
      series = list(list(
        type = "bar",
        data = list(value),
        barWidth = bar_width,
        showBackground = TRUE,
        backgroundStyle = list(color = "#c4542620", borderRadius = 8),
        itemStyle = list(color = color, borderRadius = 8),
        label = list(
          show = TRUE, position = "right", distance = 12,
          valueAnimation = TRUE, formatter = "{c}%",
          fontSize = 50, fontWeight = "bold", color = "#4a5568"
        )
      ))
    ))
}
