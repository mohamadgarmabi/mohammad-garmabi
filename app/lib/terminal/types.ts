export interface TerminalSettings {
  fontSize: number;
  backgroundColor: string;
  fontColor: string;
}

export interface Command {
  input: string;
  output: string[];
  hasLink?: boolean;
  linkUrl?: string;
}

export interface ContextMenuPosition {
  x: number;
  y: number;
}

