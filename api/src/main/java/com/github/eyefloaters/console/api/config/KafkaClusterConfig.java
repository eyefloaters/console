package com.github.eyefloaters.console.api.config;

import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class KafkaClusterConfig {

    private String name;
    private String namespace;
    private String listener;
    private Map<String, String> properties = new HashMap<>();
    private Map<String, String> adminProperties = new HashMap<>();
    private Map<String, String> consumerProperties = new HashMap<>();
    private Map<String, String> producerProperties = new HashMap<>();

    @JsonIgnore
    public String clusterKey() {
        return "%s/%s".formatted(namespace, name);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNamespace() {
        return namespace;
    }

    public void setNamespace(String namespace) {
        this.namespace = namespace;
    }

    public String getListener() {
        return listener;
    }

    public void setListener(String listener) {
        this.listener = listener;
    }

    public Map<String, String> getProperties() {
        return properties;
    }

    public void setProperties(Map<String, String> properties) {
        this.properties = properties;
    }

    public Map<String, String> getAdminProperties() {
        return adminProperties;
    }

    public void setAdminProperties(Map<String, String> adminProperties) {
        this.adminProperties = adminProperties;
    }

    public Map<String, String> getConsumerProperties() {
        return consumerProperties;
    }

    public void setConsumerProperties(Map<String, String> consumerProperties) {
        this.consumerProperties = consumerProperties;
    }

    public Map<String, String> getProducerProperties() {
        return producerProperties;
    }

    public void setProducerProperties(Map<String, String> producerProperties) {
        this.producerProperties = producerProperties;
    }

}
