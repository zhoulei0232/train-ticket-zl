import React, { memo, useCallback, useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import URI from 'urijs';
import dayjs from 'dayjs';
import './Candidate.css';
import { TrainContext } from './context';

const Channel = memo(props => {
    const { name, desc, type } = props;

    const {
        trainNumber,
        departStation,
        arriveStation,
        departDate,
    } = useContext(TrainContext);
    const src = useMemo(() => {
        return new URI('order.html')
            .setSearch('trainNumber', trainNumber)
            .setSearch('dStation', departStation)
            .setSearch('aStation', arriveStation)
            .setSearch('type', type)
            .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
            .toString();
    }, [trainNumber, departStation, arriveStation, departDate, type]);

    return (
        <div className="channel">
            <div className="middle">
                <div className="name">{name}</div>
                <div className="desc">{desc}</div>
            </div>
            <a href={src} className="buy-wrapper">
                <div className="buy">买票</div>
            </a>
        </div>
    );
});
Channel.propTypes = {
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

const Seat = memo(props => {
    const {
        type,
        priceMsg,
        ticketsLeft,
        channels,
        expanded,
        onToggle,
        idx,
    } = props;

    return (
        <li>
            <div className="bar" onClick={() => onToggle(idx)}>
                <span className="seat">{type}</span>
                <span className="price">
                    <i>¥</i>
                    {priceMsg}
                </span>
                <span className="btn">{expanded ? '预定' : '收起'}</span>
                <span className="num">{ticketsLeft}</span>
            </div>
            <div
                className="channels"
                style={{ height: expanded ? channels.length * 55 + 'px' : 0 }}
            >
                {channels.map(channle => {
                    return (
                        <Channel key={channle.name} {...channle} type={type} />
                    );
                })}
            </div>
        </li>
    );
});
Seat.propTypes = {
    type: PropTypes.string.isRequired,
    priceMsg: PropTypes.string.isRequired,
    ticketsLeft: PropTypes.string.isRequired,
    channels: PropTypes.array.isRequired,
    expanded: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    idx: PropTypes.number.isRequired,
};

const Candidate = memo(props => {
    const { tickets } = props;

    const [expandedIndex, setExpandedIndex] = useState(0);
    const onToggle = useCallback(
        idx => {
            setExpandedIndex(idx === expandedIndex ? -1 : idx);
        },
        [expandedIndex]
    );
    return (
        <div className="candidate">
            <ul>
                {tickets.map((ticket, idx) => {
                    return (
                        <Seat
                            expanded={expandedIndex === idx}
                            {...ticket}
                            key={ticket.type}
                            onToggle={onToggle}
                            idx={idx}
                        />
                    );
                })}
            </ul>
        </div>
    );
});

Candidate.propTypes = {
    tickets: PropTypes.array.isRequired,
};

export default Candidate;
