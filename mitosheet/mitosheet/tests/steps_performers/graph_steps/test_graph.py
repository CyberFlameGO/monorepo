#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Saga Inc.
# Distributed under the terms of the GPL License.

import pandas as pd
import pytest
from mitosheet.step_performers.graph_steps.graph_utils import (BAR, BOX,
                                                               DENSITY_CONTOUR,
                                                               DENSITY_HEATMAP,
                                                               ECDF, HISTOGRAM,
                                                               LINE, SCATTER,
                                                               STRIP, VIOLIN)
from mitosheet.tests.test_utils import create_mito_wrapper_dfs


def test_create_empty_graph():
    df = pd.DataFrame({'A': ['aaron', 'jake', 'nate'], 'B': [1, 2, 3]})
    mito = create_mito_wrapper_dfs(df)
    graph_id = '123'
    mito.generate_graph(graph_id, BAR, 0, False, [], [], 400, 400)

    assert len(mito.steps) == 2
    assert mito.curr_step.step_type == 'graph'

    assert mito.get_graph_type(graph_id) == BAR
    assert mito.get_graph_sheet_index(graph_id) == 0
    assert mito.get_graph_axis_column_ids(graph_id, 'x') == []
    assert mito.get_graph_axis_column_ids(graph_id, 'y') == []
    assert mito.get_is_graph_output_none(graph_id)


GRAPH_CREATION_TESTS = [
    BAR, BOX,
    DENSITY_CONTOUR,
    DENSITY_HEATMAP,
    ECDF, HISTOGRAM,
    LINE, SCATTER,
    STRIP, VIOLIN
]

@pytest.mark.parametrize("graph_type", GRAPH_CREATION_TESTS)
def test_create_graph(graph_type):
    df = pd.DataFrame({'A': ['aaron', 'jake', 'nate'], 'B': [1, 2, 3]})
    mito = create_mito_wrapper_dfs(df)
    graph_id = '123'
    mito.generate_graph(graph_id, graph_type, 0, False, ['A'], ['B'], 400, 400)

    assert len(mito.steps) == 2
    assert mito.curr_step.step_type == 'graph'

    assert mito.get_graph_type(graph_id) == graph_type
    assert mito.get_graph_sheet_index(graph_id) == 0
    assert mito.get_graph_axis_column_ids(graph_id, 'x') == ['A']
    assert mito.get_graph_axis_column_ids(graph_id, 'y') == ['B']
    assert not mito.get_is_graph_output_none(graph_id)


