interface IPointsEvents {
    move(newValue: number): IPointsEvents;

    next(curValue: number): IPointsEvents;

    prev(curValue: number): IPointsEvents;

    value: PointsResponseType;
}