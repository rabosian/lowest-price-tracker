package com.example.shopreview.controllers;

import com.example.shopreview.models.SearchItemDto;
import com.example.shopreview.utils.SearchApi;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class SearchRequestController {
    private final SearchApi searchApi;

    @GetMapping("/api/search")
    public List<SearchItemDto> getItems(@RequestParam String query) {
        String resultString = searchApi.search(query);
        return searchApi.fromJSONtoItems(resultString);
    }

}
