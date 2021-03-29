"use strict";
const brokerConfig = {
    namespace: "",
    nodeID: null,
    logger: true,
    logLevel: "info",
    transporter: "NATS",
    serializer: "JSON",
    requestTimeout: 10 * 1000,
    retryPolicy: {
        enabled: false,
        retries: 5,
        delay: 100,
        maxDelay: 1000,
        factor: 2,
        check: (err) => err && !!err.retryable,
    },
    tracing: {
        enabled: true,
        exporter: [
            {
                type: "Console",
                options: {
                    logger: null,
                    colors: true,
                    width: 100,
                    gaugeWidth: 40
                }
            },
            {
                type: "Jaeger",
                options: {
                    endpoint: null,
                    host: "127.0.0.1",
                    port: 6832,
                    sampler: {
                        type: "Const",
                        options: {}
                    },
                    tracerOptions: {},
                    defaultTags: null
                }
            }
        ]
    },
    metrics: {
        enabled: true,
        reporter: [
            {
                type: "Datadog",
                options: {
                    host: "dev.networkgateway.net",
                    baseUrl: "https://api.datadoghq.com/api/",
                    apiVersion: "v1",
                    path: "/series",
                    apiKey: process.env.DATADOG_APIKEY || "c5f57a3f55cefb3bc71684121670e831",
                    defaultLabels: (registry) => ({
                        namespace: registry.broker.namespace,
                        nodeID: registry.broker.nodeID
                    }),
                    interval: 1
                }
            }
        ]
    },
    maxCallLevel: 100,
    heartbeatInterval: 5,
    heartbeatTimeout: 15,
    tracking: {
        enabled: false,
        shutdownTimeout: 5000,
    },
    disableBalancer: false,
    registry: {
        strategy: "RoundRobin",
        preferLocal: true,
    },
    circuitBreaker: {
        enabled: true,
        threshold: 0.5,
        minRequestCount: 20,
        windowTime: 60,
        halfOpenTime: 10 * 1000,
        check: (err) => err && err.code >= 500,
    },
    bulkhead: {
        enabled: true,
        concurrency: 10,
        maxQueueSize: 100,
    },
    validator: null,
    internalServices: true,
    internalMiddlewares: true,
    hotReload: true,
    middlewares: [],
    created(broker) {
    },
    started(broker) {
    },
    stopped(broker) {
    },
    replCommands: null,
};
module.exports = brokerConfig;
//# sourceMappingURL=moleculer.config.js.map