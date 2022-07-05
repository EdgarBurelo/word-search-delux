import React from "react";
import './Grid.scss';


type GridProps = {
    grid: string[][],
    selectedLetters: string[][]
    disabled: boolean
    onMouseUpHandler: React.MouseEventHandler
    onMouseDownHandler: React.MouseEventHandler
    onMouseEnterHandler: React.MouseEventHandler
}

const Grid: React.FC<GridProps> = ({
    grid,
    selectedLetters,
    disabled,
    onMouseDownHandler,
    onMouseEnterHandler,
    onMouseUpHandler
}) => {
    return (
        <div className="grid">
            {
                grid.map((row, rowNumber) => (
                    <div
                        onMouseUp={!disabled&& onMouseUpHandler}
                        key={rowNumber + 1}
                    >
                        {row.map((letter , columnNumber) => {
                            const isSelected = selectedLetters.find((selectedLetter) => {
                                return selectedLetter.join(',') === `${columnNumber},${rowNumber}`;
                            });

                            return (
                                <span
                                    id={`${columnNumber},${rowNumber}`}
                                    className={isSelected && 'selected'}
                                    onMouseDown={!disabled && onMouseDownHandler}
                                    onMouseEnter={!disabled && onMouseEnterHandler}
                                    key={columnNumber + 1}
                                >
                                        {letter}
                                </span>
                            );
                        }
                        )}
                    </div>
                ))
            }
        </div>
    );
};

export default Grid;
