
library(echarts4r)

live_gauge <- function(id, value = 0, name = "You", color = "#c45426", 
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
