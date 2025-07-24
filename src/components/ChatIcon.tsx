import React, { useState, useEffect, useCallback } from 'react';

type SentimentType = 'Positive' | 'Negative' | 'Neutral' | 'Unclear';

const IconComponent: React.FC<{ sentimentType: string }> = ({ sentimentType }) => {
    const [iconColor, setIconColor] = useState("#3b82f6");
    const [iconType, setIconType] = useState("meh");

    const setChatIcon = useCallback(() => {
        switch (sentimentType) {
            case "Positive":
                setIconColor("#55e41cff");
                setIconType("smile");
                break;
            case "Negative":
                setIconColor("#f87171");
                setIconType("frown");
                break;
            case "Neutral":
                setIconColor("#3b82f6");
                setIconType("meh");
                break;
            case "Unclear":
                setIconColor("#7a7c80ff");
                setIconType("question");
                break;
            default:
                setIconColor("#3b82f6");
                setIconType("meh");
        }
    }, [sentimentType]);

    useEffect(() => {
        console.log("sentimentReply", sentimentType);
        setChatIcon();
    }, [sentimentType, setChatIcon]);

    // Render icon based on iconType
    const renderIcon = () => {
        switch (iconType) {
            case "smile":
                return (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill={iconColor} />
                        <ellipse cx="12" cy="15" rx="5" ry="2" fill={iconColor} />
                        <circle cx="9" cy="11" r="1.5" fill="white" />
                        <circle cx="15" cy="11" r="1.5" fill="white" />
                        <rect x="10" y="16" width="4" height="1" rx="0.5" fill="white" />
                    </svg>
                );
            case "frown":
                return (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill={iconColor} />
                        <ellipse cx="12" cy="17" rx="5" ry="2" fill="white" />
                        <circle cx="9" cy="11" r="1.5" fill="white" />
                        <circle cx="15" cy="11" r="1.5" fill="white" />
                    </svg>
                );
            case "meh":
                return (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill={iconColor} />
                        <rect x="8" y="16" width="8" height="1" rx="0.5" fill="white" />
                        <circle cx="9" cy="11" r="1.5" fill="white" />
                        <circle cx="15" cy="11" r="1.5" fill="white" />
                    </svg>
                );
            case "question":
                return (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill={iconColor} />
                        <text x="12" y="16" textAnchor="middle" fontSize="12" fill="white">?</text>
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            {renderIcon()}
        </div>
    );
};

export default IconComponent;

