import PointModel from "./PointModel";
import AbstractPublisher from "./AbstractPublisher";

export default class PointsModel extends AbstractPublisher implements IPublisher, IPointsEvents {
    private _points: PointModel[];

    constructor(points: PointsType) {
        super();
        if (typeof points === 'number') {
            this._points = [new PointModel(points)]
        } else {
            points.map(
                point => new PointModel(point)
            )
        }
    }

    get value(): PointsResponseType {
        return {
            points: this._points
                .map(point => {
                    return point.value.point
                })
        }
    }

    move(newValue: number): PointsModel {
        this._points
            .reduce(
                (prevValue, curValue) => {
                    return (Math.abs(prevValue.value.point - newValue) < Math.abs(curValue.value.point - newValue)) ? prevValue : curValue;
                }
            )
            .value.point = newValue;
        return this;
    }

    next(curValue: number, step: number = 1): PointsModel {
        this._points
            .map(
                item => {
                    if (item.value.point === curValue) {
                        item.value.point = curValue + step;
                    }
                }
            )
        return this;
    }

    prev(curValue: number, step: number = 1): PointsModel {
        this._points
            .map(
                item => {
                    if (item.value.point === curValue) {
                        item.value.point = curValue - step;
                    }
                }
            )
        return this;
    }
}