import { useState, useEffect } from "react";
import { AVAILABLE_COMMANDS } from "~/lib/terminal/constants";

export function useCommandSuggestions(currentInput: string) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);

  useEffect(() => {
    if (currentInput.trim()) {
      const matches = AVAILABLE_COMMANDS.filter((cmd) =>
        cmd.startsWith(currentInput.toLowerCase())
      );
      setSuggestions(matches);
      setSuggestionIndex(0);
    } else {
      setSuggestions([]);
    }
  }, [currentInput]);

  const getNextSuggestion = (): string | null => {
    if (suggestions.length === 0) return null;
    
    const suggestion = suggestions[suggestionIndex];
    setSuggestionIndex((suggestionIndex + 1) % suggestions.length);
    return suggestion;
  };

  return {
    suggestions,
    getNextSuggestion,
  };
}

