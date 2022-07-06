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
    const isGridDisabled = disabled ? 'disabled' : 'enabled';
    return (
        <div className="grid">
            {
                grid.map((row, rowNumber) => (
                    <div
                        key={rowNumber + 1}
                        className={`row ${isGridDisabled}`}
                        onMouseUp={onMouseUpHandler}
                    >
                        {row.map((letter , columnNumber) => {
                            const isSelected = selectedLetters.find((selectedLetter) => {
                                return selectedLetter.join(',') === `${columnNumber},${rowNumber}`;
                            });

                            return (
                                <span
                                    id={`${columnNumber},${rowNumber}`}
                                    className={`letter ${isSelected ? 'selected': 'unselected'} ${isGridDisabled}`}
                                    onMouseDown={onMouseDownHandler}
                                    onMouseEnter={onMouseEnterHandler}
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
