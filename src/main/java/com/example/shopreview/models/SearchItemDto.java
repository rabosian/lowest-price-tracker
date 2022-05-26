package com.example.shopreview.models;

import com.example.shopreview.utils.SearchApi;
import lombok.Getter;
import org.json.JSONObject;

@Getter
public class SearchItemDto {
    private String title;
    private String image;
    private String link;
    private int lprice;

    public SearchItemDto(JSONObject item) {
        this.title = item.getString("title");
        this.image = item.getString("image");
        this.link = item.getString("link");
        this.lprice = item.getInt("lprice");
    }

}
