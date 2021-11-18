import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import SpellingList from "./SpellingList";
import { DataMuseApi } from "../services/DataMuseApi";
import { Config } from "../config";
import WordData from "../model/WordData";
import { DifficultyLevel } from "../model/SpellingDifficulty";

describe("Spelling list component renders", () => {
  test("with correct spelling", async () => {
    DataMuseApi.prototype.GetRandomWord = async () => {
      return [new WordData({ word: "dummy", tags: ["f:10"], defs: ["def 1"] })];
    };

    Config.difficulty = DifficultyLevel.Moderate;
    Config.spellingListLength = 1;

    render(<SpellingList />);

    await waitFor(() => {
      const element = screen.getByText(/dummy/i);
      expect(element).toBeInTheDocument();
    });
  });

  test("with no profanities", async () => {
    DataMuseApi.prototype.GetRandomWord = async () => {
      return [
        new WordData({ word: "dummy", tags: ["f:10"], defs: ["def 1"] }),
        new WordData({ word: "fuck", tags: ["f:10"], defs: ["def 1"] }),
        new WordData({ word: "bollocks", tags: ["f:10"], defs: ["def 1"] }),
        new WordData({ word: "penis", tags: ["f:10"], defs: ["def 1"] }),
      ];
    };

    Config.difficulty = DifficultyLevel.Moderate;
    Config.spellingListLength = 1;
    Config.maxTrys = 1;

    const r = render(<SpellingList />);

    await waitFor(() => {
      const replacement = screen.queryByText(/dummy/);
      expect(replacement).toBeInTheDocument();

      const profanity = screen.queryByText(/(fuck|bollocks|penis)/);
      expect(profanity).toBeNull();

      console.log(r.container.outerHTML);
    });
  });
});
