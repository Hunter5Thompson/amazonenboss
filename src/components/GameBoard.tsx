import React, { useState, useEffect } from "react";
import axios from "axios";
import { Position } from "./Position";
import { Figure } from "./Figure";
import APICalls from "./GameAPI";

const GameBoard = () => {
  const [size, setSize] = useState<number | null>(null);
  const [figures, setFigures] = useState<Figure[]>([]);
  const [moves, setMoves] = useState<Position[]>([]);
  const [gameId] = useState<number | null>(null);
  const apiCalls = new APICalls();
  useEffect(() => {
    // Dummy-Platzhalter für gameId
  }, [gameId]);

  useEffect(() => {
    const fetchSize = async () => {
      const size = await apiCalls.getUserInput("Wie viele Reihen soll das Spielfeld haben?");
      setSize(size);
    };
    fetchSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId]);

  useEffect(() => {
    const fetchFigures = async () => {
      const size = await apiCalls.getUserInput("Wie viele Spalten soll das Spielfeld haben?");
      setFigures(generateRandomFigures(size));
    };
    fetchFigures();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId]);

  useEffect(() => {
    axios
      .get("/api/game/moves")
      .then((response) => {
        setMoves(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [figures]);

  return (
    <div className="board">
      <div className="board-grid">
        {size && Array(size)
          .fill(0)
          .map((row, i) => (
            <div key={i} className="board-row">
              {size && Array(size)
                .fill(0)
                .map((col, j) => (
                  <div
                    key={j}
                    className={
                      figures[i * size + j] ? "board-cell occupied" : "board-cell empty"
                    }
                  >
                                      {figures[i * size + j] ? (
                      <div
                        className={
                          figures[i * size + j].type === "white"
                            ? "board-cell-white"
                            : "board-cell-black"
                        }
                      />
                    ) : ""}
                  </div>
                ))}
            </div>
          ))}
      </div>
      {moves.map((move, i) => (
        <div key={i} className="board-move">
          {move.to}
        </div>
      ))}
    </div>
  );
};

const generateRandomFigures = (size: number) => {
  const figures: Figure[] = [];
  for (let i = 0; i < size * size; i++) {
    const figure = new Figure(new Position(Math.floor(Math.random() * size), Math.floor(Math.random() * size)), Math.random() > 0.5 ? "white" : "black");
    figure.setColor(Math.random() > 0.5 ? "white" : "black"); // Setze die Farbe hier
    figures.push(figure);
  }
  return figures;
};

export default GameBoard;