"use client"

import { useState } from "react"
import { ChatInterface } from "./chat-interface"
import { ContentDisplay } from "./content-display"
import { Header } from "./header"

export type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  data?: ApiResponse
}

export type ApiResponse = {
  type: "text" | "text-with-links" | "table" | "report" | "alert" | "case" | "dashboard" | "metrics"
  content: any
}

export function ComplianceChatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      // TODO: Replace with your actual API endpoint
      // const response = await fetch('YOUR_API_ENDPOINT', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ message: content }),
      // })
      // const data = await response.json()

      // Simulated API response - REMOVE THIS when integrating real API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const mockData = generateMockResponse(content)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: mockData.content.summary || "Response received",
        timestamp: new Date(),
        data: mockData,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setSelectedMessage(assistantMessage)
    } catch (error) {
      console.error("[v0] Error sending message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Main Content Display - Left Side (Large) */}
        <div className="flex-1 overflow-auto border-r border-border">
          <ContentDisplay message={selectedMessage} />
        </div>

        {/* Chat Interface - Right Side */}
        <div className="w-[480px] flex-shrink-0">
          <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            onSelectMessage={setSelectedMessage}
          />
        </div>
      </div>
    </div>
  )
}

function generateMockResponse(query: string): ApiResponse {
  const lowerQuery = query.toLowerCase()

  // Dashboard example
  if (lowerQuery.includes("dashboard") || lowerQuery.includes("overview")) {
    return {
      type: "dashboard",
      content: {
        summary: "Compliance Dashboard Overview",
        metrics: [
          { label: "Active Cases", value: "247", change: "+12%", trend: "up" },
          { label: "Resolved Today", value: "18", change: "+5%", trend: "up" },
          { label: "Critical Alerts", value: "3", change: "-2", trend: "down" },
          { label: "Avg Response Time", value: "2.4h", change: "-15%", trend: "down" },
        ],
        charts: [
          {
            title: "Case Resolution Trend",
            type: "line",
            data: [45, 52, 48, 61, 58, 67, 72],
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
          {
            title: "Cases by Priority",
            type: "bar",
            data: [
              { label: "Critical", value: 12, color: "#ef4444" },
              { label: "High", value: 34, color: "#f97316" },
              { label: "Medium", value: 89, color: "#eab308" },
              { label: "Low", value: 112, color: "#22c55e" },
            ],
          },
        ],
        recentActivity: [
          { action: "Case CASE-247 assigned to John Doe", time: "2 minutes ago" },
          { action: "Alert ALT-089 resolved", time: "15 minutes ago" },
          { action: "New compliance report generated", time: "1 hour ago" },
        ],
      },
    }
  }

  // Metrics example
  if (lowerQuery.includes("metric") || lowerQuery.includes("stat") || lowerQuery.includes("kpi")) {
    return {
      type: "metrics",
      content: {
        summary: "Key Performance Indicators",
        metrics: [
          {
            label: "Compliance Score",
            value: "94.2%",
            change: "+2.1%",
            trend: "up",
            description: "Overall compliance rating across all departments",
          },
          {
            label: "Cases Resolved",
            value: "1,847",
            change: "+156",
            trend: "up",
            description: "Total cases closed this month",
          },
          {
            label: "Response Time",
            value: "4.2h",
            change: "-1.3h",
            trend: "down",
            description: "Average time to first response",
          },
          {
            label: "Team Efficiency",
            value: "87%",
            change: "+5%",
            trend: "up",
            description: "Cases resolved within SLA",
          },
        ],
      },
    }
  }

  // Table example
  if (lowerQuery.includes("table") || lowerQuery.includes("list") || lowerQuery.includes("case")) {
    return {
      type: "table",
      content: {
        summary: "Recent Cases Overview",
        headers: ["Case ID", "Title", "Status", "Priority", "Assigned To", "Created", "Due Date"],
        rows: [
          ["CASE-247", "Data Privacy Violation", "Open", "Critical", "John Doe", "2025-02-10", "2025-02-12"],
          ["CASE-246", "Access Control Review", "In Progress", "High", "Jane Smith", "2025-02-10", "2025-02-15"],
          ["CASE-245", "Policy Update Required", "Open", "Medium", "Bob Johnson", "2025-02-09", "2025-02-20"],
          ["CASE-244", "Audit Documentation", "Resolved", "Low", "Alice Brown", "2025-02-09", "2025-02-18"],
          ["CASE-243", "Security Incident", "In Progress", "Critical", "John Doe", "2025-02-08", "2025-02-11"],
          ["CASE-242", "Compliance Training", "Resolved", "Medium", "Jane Smith", "2025-02-08", "2025-02-22"],
        ],
      },
    }
  }

  // Alert example
  if (lowerQuery.includes("alert") || lowerQuery.includes("warning") || lowerQuery.includes("incident")) {
    return {
      type: "alert",
      content: {
        summary: "Active Security Alerts",
        alerts: [
          {
            id: "ALT-089",
            severity: "critical",
            title: "Unauthorized Access Attempt Detected",
            description:
              "Multiple failed login attempts from IP 192.168.1.100. Potential brute force attack in progress.",
            timestamp: "2025-02-10 14:32:00",
            affectedSystems: ["Authentication Service", "User Database"],
            recommendedActions: ["Block IP address", "Reset affected user passwords", "Enable MFA"],
          },
          {
            id: "ALT-088",
            severity: "high",
            title: "Unusual Data Export Activity",
            description: "Large volume of sensitive data exported outside business hours by user account 'jsmith'.",
            timestamp: "2025-02-10 13:15:00",
            affectedSystems: ["Data Warehouse", "Export Service"],
            recommendedActions: ["Review export logs", "Contact user", "Verify data classification"],
          },
          {
            id: "ALT-087",
            severity: "medium",
            title: "Compliance Policy Violation",
            description: "Document shared externally without proper encryption or access controls.",
            timestamp: "2025-02-10 11:45:00",
            affectedSystems: ["Document Management"],
            recommendedActions: ["Revoke external access", "Apply encryption", "User training"],
          },
        ],
      },
    }
  }

  // Report example
  if (lowerQuery.includes("report") || lowerQuery.includes("analysis")) {
    return {
      type: "report",
      content: {
        summary: "Monthly Compliance Report - February 2025",
        sections: [
          {
            title: "Executive Summary",
            content:
              "Overall compliance score improved to 94.2% this month, up from 92.1% in January. All critical requirements have been met, with 3 minor issues identified and scheduled for resolution. The team successfully closed 1,847 cases, exceeding our target by 12%.",
          },
          {
            title: "Key Achievements",
            items: [
              "Reduced average response time by 31% through process optimization",
              "Implemented automated alert triage system, improving efficiency by 45%",
              "Completed security audit with zero critical findings",
              "Achieved 98% SLA compliance for high-priority cases",
            ],
          },
          {
            title: "Performance Metrics",
            metrics: [
              { label: "Total Cases Processed", value: "1,847" },
              { label: "Cases Resolved", value: "1,831" },
              { label: "Pending Cases", value: "16" },
              { label: "Avg Resolution Time", value: "4.2 days" },
              { label: "Customer Satisfaction", value: "4.8/5.0" },
              { label: "Team Utilization", value: "87%" },
            ],
          },
          {
            title: "Areas for Improvement",
            items: [
              "Reduce backlog of medium-priority cases by 20%",
              "Enhance documentation for complex compliance scenarios",
              "Expand training program to cover new regulatory requirements",
            ],
          },
          {
            title: "Upcoming Initiatives",
            content:
              "Next month, we will focus on implementing AI-powered case classification, expanding our integration with third-party risk management tools, and conducting comprehensive team training on the updated compliance framework.",
          },
        ],
      },
    }
  }

  // Links example
  if (lowerQuery.includes("link") || lowerQuery.includes("document") || lowerQuery.includes("policy")) {
    return {
      type: "text-with-links",
      content: {
        summary: "Relevant Compliance Documentation",
        text: "I found several important documents and resources related to your query. These materials provide comprehensive guidance on compliance policies, procedures, and best practices:",
        links: [
          {
            title: "Compliance Policy Framework 2025",
            url: "#policy-2025",
            description: "Updated compliance policies and procedures for the current year",
          },
          {
            title: "Security Audit Guidelines",
            url: "#audit-guidelines",
            description: "Step-by-step guide for conducting internal security audits",
          },
          {
            title: "Risk Assessment Framework",
            url: "#risk-framework",
            description: "Methodology for identifying and evaluating compliance risks",
          },
          {
            title: "Incident Response Playbook",
            url: "#incident-response",
            description: "Procedures for handling security incidents and breaches",
          },
          {
            title: "Data Privacy Regulations Guide",
            url: "#privacy-guide",
            description: "Overview of GDPR, CCPA, and other privacy requirements",
          },
        ],
      },
    }
  }

  // Default text response
  return {
    type: "text",
    content: {
      summary: "Response to your query",
      text: `I understand you're asking about: "${query}". This is a comprehensive sample response demonstrating the chatbot's capabilities. When you integrate your API, this will be replaced with real data from your backend system. The system supports various response types including dashboards, metrics, tables, reports, alerts, and documents with links.`,
    },
  }
}
