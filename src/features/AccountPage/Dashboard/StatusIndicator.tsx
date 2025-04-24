import React from "react";

const StatusIndicator: React.FC<{ reduction?: boolean }> = React.memo(( reduction ) => {
    
    return (
        <>
            <div 
        role="status"
        aria-label={reduction ? "Событие: снижение" : "Событие: отсутствие снижения"}
        style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: reduction.reduction ? '#28a745' : '#dc3545'
        }}
    />
        </>
     
)});

export default StatusIndicator