"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  Play,
  RefreshCw,
  Settings,
  Zap,
} from "lucide-react";
import { InvoiceApiTester, ApiTestResult } from "@/lib/api/test-invoice-api";

interface TestResults {
  connection?: ApiTestResult;
  generation?: ApiTestResult;
  retrieval?: ApiTestResult;
}

export function ApiTestPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<TestResults>({});
  const [lastRunTime, setLastRunTime] = useState<Date | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_INVOICE_API_URL || 'http://localhost:11111';
  const isDemoMode = !process.env.NEXT_PUBLIC_INVOICE_API_URL;

  const runAllTests = async () => {
    setIsRunning(true);
    setResults({});

    try {
      const testResults = await InvoiceApiTester.runAllTests();
      setResults(testResults);
      setLastRunTime(new Date());
    } catch (error) {
      console.error('Test suite failed:', error);
      setResults({
        connection: {
          success: false,
          message: 'Test suite failed to run',
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      });
    } finally {
      setIsRunning(false);
    }
  };

  const runSingleTest = async (testType: 'connection' | 'generation' | 'retrieval') => {
    setIsRunning(true);

    try {
      let result: ApiTestResult;

      switch (testType) {
        case 'connection':
          result = await InvoiceApiTester.testConnection();
          break;
        case 'generation':
          result = await InvoiceApiTester.testInvoiceGeneration();
          break;
        case 'retrieval':
          result = await InvoiceApiTester.testPdfRetrieval(`TEST-${Date.now()}`);
          break;
      }

      setResults(prev => ({
        ...prev,
        [testType]: result
      }));
    } catch (error) {
      console.error(`${testType} test failed:`, error);
      setResults(prev => ({
        ...prev,
        [testType]: {
          success: false,
          message: `${testType} test failed`,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }));
    } finally {
      setIsRunning(false);
    }
  };

  const getStatusIcon = (result?: ApiTestResult) => {
    if (!result) return <Clock className="h-4 w-4 text-gray-400" />;
    return result.success
      ? <CheckCircle className="h-4 w-4 text-green-600" />
      : <AlertCircle className="h-4 w-4 text-red-600" />;
  };

  const getStatusBadge = (result?: ApiTestResult) => {
    if (!result) return <Badge variant="outline">Not Run</Badge>;
    return result.success
      ? <Badge className="bg-green-100 text-green-800">Success</Badge>
      : <Badge className="bg-red-100 text-red-800">Failed</Badge>;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Settings className="h-4 w-4" />
          API Test
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Invoice API Testing Panel
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* API Configuration Status */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API URL:</span>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {apiUrl}
                </code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Mode:</span>
                <Badge variant={isDemoMode ? "secondary" : "default"}>
                  {isDemoMode ? "Demo Mode" : "Production"}
                </Badge>
              </div>
              {lastRunTime && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Test:</span>
                  <span className="text-xs text-gray-500">
                    {lastRunTime.toLocaleTimeString()}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Test Controls */}
          <div className="flex gap-2">
            <Button
              onClick={runAllTests}
              disabled={isRunning}
              className="flex-1"
            >
              {isRunning ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              Run All Tests
            </Button>
          </div>

          {/* Test Results */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {/* Connection Test */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(results.connection)}
                      <span className="font-medium text-sm">Connection Test</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(results.connection)}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => runSingleTest('connection')}
                        disabled={isRunning}
                      >
                        <Zap className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {results.connection && (
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {results.connection.message}
                    </p>
                    {results.connection.responseTime && (
                      <p className="text-xs text-gray-500 mt-1">
                        Response time: {results.connection.responseTime}ms
                      </p>
                    )}
                  </CardContent>
                )}
              </Card>

              {/* Generation Test */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(results.generation)}
                      <span className="font-medium text-sm">PDF Generation Test</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(results.generation)}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => runSingleTest('generation')}
                        disabled={isRunning}
                      >
                        <FileText className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {results.generation && (
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {results.generation.message}
                    </p>
                    {results.generation.responseTime && (
                      <p className="text-xs text-gray-500 mt-1">
                        Response time: {results.generation.responseTime}ms
                      </p>
                    )}
                  </CardContent>
                )}
              </Card>

              {/* Retrieval Test */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(results.retrieval)}
                      <span className="font-medium text-sm">PDF Retrieval Test</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(results.retrieval)}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => runSingleTest('retrieval')}
                        disabled={isRunning}
                      >
                        <FileText className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {results.retrieval && (
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {results.retrieval.message}
                    </p>
                    {results.retrieval.responseTime && (
                      <p className="text-xs text-gray-500 mt-1">
                        Response time: {results.retrieval.responseTime}ms
                      </p>
                    )}
                  </CardContent>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              {Object.entries(results).map(([testName, result]) => (
                <Card key={testName}>
                  <CardHeader>
                    <CardTitle className="text-sm capitalize">
                      {testName} Test Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Status:</span>
                        <span className={`ml-2 font-medium ${result.success ? 'text-green-600' : 'text-red-600'}`}>
                          {result.success ? 'Success' : 'Failed'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Response Time:</span>
                        <span className="ml-2 font-mono text-xs">
                          {result.responseTime || 'N/A'}ms
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">Message:</span>
                      <p className="text-sm mt-1 p-2 bg-gray-50 rounded text-gray-800">
                        {result.message}
                      </p>
                    </div>
                    {result.error && (
                      <div>
                        <span className="text-red-600 text-sm">Error:</span>
                        <p className="text-sm mt-1 p-2 bg-red-50 rounded text-red-800 font-mono">
                          {result.error}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

          {/* Helpful Tips */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Tips:</strong>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Ensure your PDF service is running on {apiUrl}</li>
                <li>• Check that CORS is properly configured</li>
                <li>• You can also test via console: <code className="bg-gray-100 px-1 rounded">testInvoiceApi()</code></li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      </DialogContent>
    </Dialog>
  );
}
