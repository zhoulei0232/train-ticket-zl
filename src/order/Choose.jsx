import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Choose.css';

const Choose = memo(props => {
    const { passengers, upDatePassenger } = props;

    function createSeat(seatType) {
        return (
            <div>
                {passengers.map(passenger => {
                    return (
                        <p
                            key={passenger.id}
                            className={classnames('seat', {
                                active: passenger.seat === seatType,
                            })}
                            data-text={seatType}
                            onClick={() =>
                                upDatePassenger(passenger.id, {
                                    seat: seatType,
                                })
                            }
                        >
                            &#xe02d;
                        </p>
                    );
                })}
            </div>
        );
    }

    return (
        <div className=" choose">
            <p className="tip">在线选座</p>
            <div className="container">
                <div className="seats">
                    <div>窗</div>
                    {createSeat('A')}
                    {createSeat('B')}
                    {createSeat('C')}
                    <div>过道</div>
                    {createSeat('D')}
                    {createSeat('F')}
                    <div>窗</div>
                </div>
            </div>
        </div>
    );
});

Choose.prototypes = {
    passengers: PropTypes.array.isRequired,
    upDatePassenger: PropTypes.func.isRequired,
};

export default Choose;
