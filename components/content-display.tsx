"use client"

import type { Message } from "./compliance-chatbot"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertCircle,
  AlertTriangle,
  ExternalLink,
  TrendingUp,
  Sparkles,
  TrendingDown,
  Activity,
  BarChart3,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { TypewriterText } from "./typewriter-text"

type ContentDisplayProps = {
  message: Message | null
}

export function ContentDisplay({ message }: ContentDisplayProps) {
  if (!message || !message.data) {
    return (
      <div className="flex h-full items-center justify-center p-12">
        <div className="text-center">
          <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-black to-gray-800 shadow-2xl animate-logo-pulse">
            <Sparkles className="h-16 w-16 text-white animate-logo-float" />
          </div>
          <h2 className="mb-3 text-4xl font-bold text-foreground text-balance leading-tight">
            Compliance Intelligence Hub
          </h2>
          <p className="text-lg font-semibold text-muted-foreground">
            Select a message from the chat to view detailed insights
          </p>
        </div>
      </div>
    )
  }

  const { data } = message

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-gray-50/50 to-white p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="mb-10 animate-fade-in-up">
          <h1 className="mb-3 text-5xl font-bold text-foreground text-balance leading-tight">
            <TypewriterText text={data.content.summary} speed={40} />
          </h1>
          <p className="text-base font-semibold text-muted-foreground">
            Generated at {message.timestamp.toLocaleString()}
          </p>
        </div>

        {/* Render based on type */}
        {data.type === "text" && <TextContent content={data.content} />}
        {data.type === "text-with-links" && <TextWithLinksContent content={data.content} />}
        {data.type === "table" && <TableContent content={data.content} />}
        {data.type === "report" && <ReportContent content={data.content} />}
        {data.type === "alert" && <AlertContent content={data.content} />}
        {data.type === "dashboard" && <DashboardContent content={data.content} />}
        {data.type === "metrics" && <MetricsContent content={data.content} />}
      </div>
    </div>
  )
}

function TextContent({ content }: { content: any }) {
  return (
    <Card className="glossy-card border-2">
      <CardContent className="pt-8">
        <p className="text-xl leading-relaxed text-foreground font-medium">
          <TypewriterText text={content.text} speed={25} />
        </p>
      </CardContent>
    </Card>
  )
}

function TextWithLinksContent({ content }: { content: any }) {
  return (
    <div className="space-y-6">
      <Card className="glossy-card border-2">
        <CardContent className="pt-8">
          <p className="mb-8 text-xl leading-relaxed text-foreground font-medium">
            <TypewriterText text={content.text} speed={25} />
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {content.links.map((link: any, index: number) => (
          <Card key={index} className="glossy-card border-2 transition-all hover:shadow-2xl hover:-translate-y-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg">
                <span className="font-bold">{link.title}</span>
                <ExternalLink className="h-5 w-5 text-black" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full font-bold bg-white/50 border-2 border-black/10 hover:bg-black hover:text-white transition-all"
                asChild
              >
                <a href={link.url}>View Document</a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function TableContent({ content }: { content: any }) {
  return (
    <Card className="glossy-card border-2 animate-fade-in-up">
      <CardHeader className="border-b border-black/5 bg-gradient-to-r from-white to-gray-50/50">
        <CardTitle className="text-3xl font-bold">Data Overview</CardTitle>
        <CardDescription className="text-base font-semibold">Showing {content.rows.length} records</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="glass-table rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-gray-50 to-white border-b-2 border-black/10 hover:bg-gray-50">
                {content.headers.map((header: string, index: number) => (
                  <TableHead key={index} className="font-bold text-foreground text-base h-14">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {content.rows.map((row: string[], rowIndex: number) => (
                <TableRow key={rowIndex} className="hover:bg-gray-50/50 border-b border-black/5 transition-colors">
                  {row.map((cell: string, cellIndex: number) => (
                    <TableCell key={cellIndex} className="font-semibold text-base py-4">
                      {cellIndex === 2 ? (
                        <Badge
                          variant={cell === "Open" ? "default" : cell === "Resolved" ? "secondary" : "outline"}
                          className="font-bold text-sm px-3 py-1 badge-animate"
                        >
                          {cell}
                        </Badge>
                      ) : cellIndex === 3 ? (
                        <Badge
                          variant={
                            cell === "Critical" || cell === "High"
                              ? "destructive"
                              : cell === "Medium"
                                ? "default"
                                : "secondary"
                          }
                          className="font-bold text-sm px-3 py-1"
                        >
                          {cell}
                        </Badge>
                      ) : (
                        cell
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

function ReportContent({ content }: { content: any }) {
  return (
    <div className="space-y-8">
      {content.sections.map((section: any, index: number) => (
        <Card key={index} className="glossy-card border-2">
          <CardHeader className="border-b border-black/5 bg-gradient-to-r from-white to-gray-50/50">
            <CardTitle className="flex items-center gap-3 text-2xl font-bold">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-black to-gray-800 shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              {section.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            {section.content && (
              <p className="mb-6 text-xl leading-relaxed text-foreground font-medium">
                <TypewriterText text={section.content} speed={25} />
              </p>
            )}
            {section.metrics && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {section.metrics.map((metric: any, metricIndex: number) => (
                  <div key={metricIndex} className="metric-card rounded-2xl p-6">
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide">{metric.label}</p>
                    <p className="mt-3 text-4xl font-bold text-foreground">{metric.value}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function AlertContent({ content }: { content: any }) {
  return (
    <div className="space-y-6">
      {content.alerts.map((alert: any, index: number) => (
        <Card
          key={index}
          className={cn(
            "glossy-card border-l-[6px] border-2 animate-fade-in-up",
            alert.severity === "critical"
              ? "border-l-destructive"
              : alert.severity === "high"
                ? "border-l-orange-500"
                : "border-l-yellow-500",
            index === 0 ? "" : index === 1 ? "animate-delay-100" : "animate-delay-200",
          )}
        >
          <CardHeader className="border-b border-black/5 bg-gradient-to-r from-white to-gray-50/50">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-xl shadow-lg",
                    alert.severity === "critical"
                      ? "bg-gradient-to-br from-red-600 to-red-800"
                      : "bg-gradient-to-br from-orange-500 to-orange-700",
                  )}
                >
                  {alert.severity === "critical" ? (
                    <AlertCircle className="h-7 w-7 text-white" />
                  ) : (
                    <AlertTriangle className="h-7 w-7 text-white" />
                  )}
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">{alert.title}</CardTitle>
                  <CardDescription className="mt-2 text-base font-semibold">Alert ID: {alert.id}</CardDescription>
                </div>
              </div>
              <Badge
                variant={alert.severity === "critical" ? "destructive" : "default"}
                className="font-bold uppercase text-sm px-4 py-1.5 badge-animate"
              >
                {alert.severity}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <p className="text-lg leading-relaxed text-foreground font-medium">
              <TypewriterText text={alert.description} speed={25} />
            </p>

            {alert.affectedSystems && (
              <div>
                <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wide mb-3">
                  Affected Systems
                </h4>
                <div className="flex flex-wrap gap-2">
                  {alert.affectedSystems.map((system: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="font-semibold">
                      {system}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {alert.recommendedActions && (
              <div>
                <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wide mb-3">
                  Recommended Actions
                </h4>
                <ul className="space-y-2">
                  {alert.recommendedActions.map((action: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-base font-medium">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-black/5">
              <p className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {alert.timestamp}
              </p>
              <Button
                variant="outline"
                className="font-bold bg-white/50 border-2 border-black/10 hover:bg-black hover:text-white transition-all"
              >
                Investigate
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function DashboardContent({ content }: { content: any }) {
  return (
    <div className="space-y-8">
      {/* Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {content.metrics.map((metric: any, index: number) => (
          <Card
            key={index}
            className={cn(
              "dashboard-card rounded-2xl animate-fade-in-up",
              index === 0
                ? ""
                : index === 1
                  ? "animate-delay-100"
                  : index === 2
                    ? "animate-delay-200"
                    : "animate-delay-300",
            )}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide">{metric.label}</p>
                {metric.trend === "up" ? (
                  <TrendingUp className="h-5 w-5 text-green-600" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-600" />
                )}
              </div>
              <p className="text-4xl font-bold text-foreground mb-2">{metric.value}</p>
              <p className={cn("text-sm font-bold", metric.trend === "up" ? "text-green-600" : "text-red-600")}>
                {metric.change} from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      {content.charts && (
        <div className="grid gap-6 lg:grid-cols-2">
          {content.charts.map((chart: any, index: number) => (
            <Card key={index} className="glossy-card border-2 animate-fade-in-up animate-delay-400">
              <CardHeader className="border-b border-black/5 bg-gradient-to-r from-white to-gray-50/50">
                <CardTitle className="flex items-center gap-3 text-xl font-bold">
                  <BarChart3 className="h-6 w-6" />
                  {chart.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="chart-container rounded-xl p-6 h-64 flex items-center justify-center">
                  <p className="text-muted-foreground font-semibold">Chart visualization: {chart.type}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Recent Activity */}
      {content.recentActivity && (
        <Card className="glossy-card border-2 animate-fade-in-up animate-delay-400">
          <CardHeader className="border-b border-black/5 bg-gradient-to-r from-white to-gray-50/50">
            <CardTitle className="flex items-center gap-3 text-2xl font-bold">
              <Activity className="h-6 w-6" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {content.recentActivity.map((activity: any, index: number) => (
                <div
                  key={index}
                  className="flex items-start justify-between p-4 rounded-xl bg-gray-50/50 border border-black/5"
                >
                  <p className="text-base font-semibold text-foreground">{activity.action}</p>
                  <p className="text-sm font-semibold text-muted-foreground whitespace-nowrap ml-4">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function MetricsContent({ content }: { content: any }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {content.metrics.map((metric: any, index: number) => (
        <Card
          key={index}
          className={cn(
            "dashboard-card border-2 animate-fade-in-up",
            index === 0
              ? ""
              : index === 1
                ? "animate-delay-100"
                : index === 2
                  ? "animate-delay-200"
                  : "animate-delay-300",
          )}
        >
          <CardHeader className="border-b border-black/5 bg-gradient-to-r from-white to-gray-50/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">{metric.label}</CardTitle>
              {metric.trend === "up" ? (
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-700 shadow-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-700 shadow-lg">
                  <TrendingDown className="h-6 w-6 text-white" />
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-5xl font-bold text-foreground mb-3">{metric.value}</p>
            <p className={cn("text-lg font-bold mb-4", metric.trend === "up" ? "text-green-600" : "text-red-600")}>
              {metric.change} from last period
            </p>
            {metric.description && (
              <p className="text-base font-medium text-muted-foreground leading-relaxed">{metric.description}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
