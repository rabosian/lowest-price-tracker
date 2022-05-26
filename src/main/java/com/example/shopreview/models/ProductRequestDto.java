package com.example.shopreview.models;

import lombok.Getter;

import javax.persistence.Column;

@Getter
public class ProductRequestDto {
    private String title;
    private String image;
    private String link;
    private int lprice;
}
