package com.devsprints.backend.payload.request;

public class SignInRequest {
    private String name;
    private String password;
    private Integer level;
    private String email;

    public SignInRequest() {
    }

    public SignInRequest(String name, String password, Integer level, String email) {
        this.name = name;
        this.password = password;
        this.level = level;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "SignInRequest{" +
               "name='" + name + ' ' +
               ", password='[PROTECTED]'" +
               ", level=" + level +
               ", email='" + email + ' ' +
               '}';
    }
}
