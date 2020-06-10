import React, { memo } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Collapse from '@material-ui/core/Collapse';

import { useAppCollapseSectionStyles } from './use-app-collapse-section-styles';
import { useBooleanState } from '../../hooks';

interface AppCollapseSectionProps {
  caption?: string;
  children: any;
}

export const AppCollapseSection = memo(
  ({ caption, children }: AppCollapseSectionProps) => {
    const classes = useAppCollapseSectionStyles();
    const [expanded, setExpanded, setCollapsed] = useBooleanState(true);

    return (
      <div className={classes.collapseSectionWrapper}>
        <div className={classes.caption}>
          {caption}
          <IconButton
            className={classes.icon}
            aria-label='expanded'
            onClick={expanded ? setCollapsed : setExpanded}
          >
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </div>
        <Collapse in={expanded}>{children}</Collapse>
      </div>
    );
  },
);
