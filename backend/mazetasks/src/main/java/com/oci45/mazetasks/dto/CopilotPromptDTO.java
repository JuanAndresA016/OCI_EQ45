package com.oci45.mazetasks.dto;

public class CopilotPromptDTO {
    private String prompt;
    private Long tareaPadreId;

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public Long getTareaPadreId() {
        return tareaPadreId;
    }

    public void setTareaPadreId(Long tareaPadreId) {
        this.tareaPadreId = tareaPadreId;
    }
}