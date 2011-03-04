package com.bti.ws.controller;

import com.bti.ws.domain.Word;
import org.springframework.roo.addon.web.mvc.controller.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RooWebScaffold(path = "words", formBackingObject = Word.class)
@RequestMapping("/words")
@Controller
public class WordController {
}
