"""
Logging Utility for Crawl4AI Server

This module provides functions for logging Crawl4AI operations to Supabase.
It includes functions for logging crawl operations, errors, and performance metrics.
"""

import os
import time
import json
import logging
import traceback
from datetime import datetime
from typing import Dict, Any, Optional, List, Union

import supabase
from dotenv import load_dotenv

# Load environment variables
load_dotenv(dotenv_path=os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env.local'))

# Configure standard Python logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(os.path.join(os.path.dirname(__file__), 'logs', 'crawl4ai.log')),
        logging.StreamHandler()
    ]
)

# Create logger
logger = logging.getLogger('crawl4ai')

# Supabase client
supabase_url = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
supabase_key = os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')
supabase_client = None

if supabase_url and supabase_key:
    try:
        supabase_client = supabase.create_client(supabase_url, supabase_key)
        logger.info("Supabase client initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize Supabase client: {str(e)}")
else:
    logger.warning("Supabase URL or key not found in environment variables")

# Log levels
class LogLevel:
    DEBUG = 'DEBUG'
    INFO = 'INFO'
    WARN = 'WARN'
    ERROR = 'ERROR'
    FATAL = 'FATAL'

# Error severity levels
class ErrorSeverity:
    LOW = 'LOW'
    MEDIUM = 'MEDIUM'
    HIGH = 'HIGH'
    CRITICAL = 'CRITICAL'

# Crawl4AI operation types
class Crawl4AIOperation:
    CRAWL_START = 'CRAWL_START'
    CRAWL_END = 'CRAWL_END'
    CRAWL_PAGE = 'CRAWL_PAGE'
    EXTRACT_CONTENT = 'EXTRACT_CONTENT'
    SCREENSHOT = 'SCREENSHOT'
    EXTRACT_COMPONENTS = 'EXTRACT_COMPONENTS'
    EXTRACT_LINKS = 'EXTRACT_LINKS'
    EXTRACT_IMAGES = 'EXTRACT_IMAGES'

# Crawl4AI operation status
class Crawl4AIStatus:
    SUCCESS = 'SUCCESS'
    FAILURE = 'FAILURE'
    WARNING = 'WARNING'
    IN_PROGRESS = 'IN_PROGRESS'

def log_to_supabase(table: str, data: Dict[str, Any]) -> bool:
    """
    Log data to Supabase

    Args:
        table: Table name
        data: Data to log

    Returns:
        bool: True if successful, False if failed
    """
    if not supabase_client:
        logger.warning(f"Supabase client not initialized, logging to file only: {data}")
        return False

    try:
        response = supabase_client.table(table).insert(data).execute()
        if hasattr(response, 'error') and response.error:
            logger.error(f"Error logging to Supabase: {response.error}")
            return False
        return True
    except Exception as e:
        logger.error(f"Unexpected error logging to Supabase: {str(e)}")
        return False

def log_system_event(level: str, source: str, message: str, **kwargs) -> bool:
    """
    Log a system event

    Args:
        level: Log level (DEBUG, INFO, WARN, ERROR, FATAL)
        source: Component/module that generated the log
        message: Log message
        **kwargs: Additional options

    Returns:
        bool: True if successful, False if failed
    """
    # Log to Python logger
    if level == LogLevel.DEBUG:
        logger.debug(f"{source}: {message}")
    elif level == LogLevel.INFO:
        logger.info(f"{source}: {message}")
    elif level == LogLevel.WARN:
        logger.warning(f"{source}: {message}")
    elif level == LogLevel.ERROR:
        logger.error(f"{source}: {message}")
    elif level == LogLevel.FATAL:
        logger.critical(f"{source}: {message}")

    # Log to Supabase
    data = {
        'timestamp': datetime.now().isoformat(),
        'level': level,
        'source': source,
        'message': message,
        'details': kwargs.get('details'),
        'user_id': kwargs.get('user_id'),
        'session_id': kwargs.get('session_id'),
        'request_id': kwargs.get('request_id'),
        'ip_address': kwargs.get('ip_address'),
        'user_agent': kwargs.get('user_agent')
    }

    return log_to_supabase('system_logs', data)

def log_crawl4ai_operation(operation: str, url: str, status: str, **kwargs) -> bool:
    """
    Log a Crawl4AI operation

    Args:
        operation: Operation type
        url: URL being crawled
        status: Operation status
        **kwargs: Additional options

    Returns:
        bool: True if successful, False if failed
    """
    # Log to Python logger
    logger.info(f"Crawl4AI {operation} - {url} - {status}")

    # Log to Supabase
    data = {
        'timestamp': datetime.now().isoformat(),
        'operation': operation,
        'url': url,
        'status': status,
        'duration_ms': kwargs.get('duration_ms'),
        'page_title': kwargs.get('page_title'),
        'content_extracted': kwargs.get('content_extracted'),
        'screenshot_captured': kwargs.get('screenshot_captured'),
        'components_identified': kwargs.get('components_identified'),
        'links_extracted': kwargs.get('links_extracted'),
        'images_extracted': kwargs.get('images_extracted'),
        'error_message': kwargs.get('error_message'),
        'details': kwargs.get('details')
    }

    return log_to_supabase('crawl4ai_logs', data)

def log_error(error_type: str, error_message: str, component: str, severity: str, **kwargs) -> bool:
    """
    Log an error

    Args:
        error_type: Type of error
        error_message: Error message
        component: Component where error occurred
        severity: Error severity
        **kwargs: Additional options

    Returns:
        bool: True if successful, False if failed
    """
    # Log to Python logger
    logger.error(f"{component} - {error_type}: {error_message}")

    # Get stack trace if not provided
    stack_trace = kwargs.get('stack_trace')
    if not stack_trace:
        stack_trace = traceback.format_exc()

    # Log to Supabase
    data = {
        'timestamp': datetime.now().isoformat(),
        'error_type': error_type,
        'error_message': error_message,
        'stack_trace': stack_trace,
        'component': component,
        'severity': severity,
        'user_id': kwargs.get('user_id'),
        'session_id': kwargs.get('session_id'),
        'request_id': kwargs.get('request_id'),
        'url': kwargs.get('url'),
        'request_data': kwargs.get('request_data'),
        'environment_info': kwargs.get('environment_info'),
        'resolved': False
    }

    return log_to_supabase('error_logs', data)

def log_performance(component: str, operation: str, duration_ms: int, **kwargs) -> bool:
    """
    Log performance metrics

    Args:
        component: Component being measured
        operation: Operation being performed
        duration_ms: Duration in milliseconds
        **kwargs: Additional options

    Returns:
        bool: True if successful, False if failed
    """
    # Log to Python logger
    logger.info(f"Performance - {component} - {operation}: {duration_ms}ms")

    # Log to Supabase
    data = {
        'timestamp': datetime.now().isoformat(),
        'component': component,
        'operation': operation,
        'duration_ms': duration_ms,
        'memory_usage_kb': kwargs.get('memory_usage_kb'),
        'cpu_usage_percent': kwargs.get('cpu_usage_percent'),
        'request_count': kwargs.get('request_count'),
        'error_count': kwargs.get('error_count'),
        'user_count': kwargs.get('user_count'),
        'details': kwargs.get('details')
    }

    return log_to_supabase('performance_logs', data)

# Performance tracking decorator
def track_performance(component: str, operation: str):
    """
    Decorator to track performance of a function

    Args:
        component: Component being measured
        operation: Operation being performed

    Returns:
        Decorated function
    """
    def decorator(func):
        def wrapper(*args, **kwargs):
            start_time = time.time()
            try:
                result = func(*args, **kwargs)
                duration_ms = int((time.time() - start_time) * 1000)
                log_performance(component, operation, duration_ms)
                return result
            except Exception as e:
                duration_ms = int((time.time() - start_time) * 1000)
                log_performance(component, operation, duration_ms, error_count=1)
                raise
        return wrapper
    return decorator

# Convenience methods for system logging
def debug(source: str, message: str, **kwargs) -> bool:
    return log_system_event(LogLevel.DEBUG, source, message, **kwargs)

def info(source: str, message: str, **kwargs) -> bool:
    return log_system_event(LogLevel.INFO, source, message, **kwargs)

def warn(source: str, message: str, **kwargs) -> bool:
    return log_system_event(LogLevel.WARN, source, message, **kwargs)

def error(source: str, message: str, **kwargs) -> bool:
    return log_system_event(LogLevel.ERROR, source, message, **kwargs)

def fatal(source: str, message: str, **kwargs) -> bool:
    return log_system_event(LogLevel.FATAL, source, message, **kwargs)

# Exception handler decorator
def handle_exceptions(component: str, severity: str = ErrorSeverity.MEDIUM):
    """
    Decorator to handle exceptions and log them

    Args:
        component: Component where error occurred
        severity: Error severity

    Returns:
        Decorated function
    """
    def decorator(func):
        def wrapper(*args, **kwargs):
            try:
                return func(*args, **kwargs)
            except Exception as e:
                error_type = type(e).__name__
                error_message = str(e)
                log_error(error_type, error_message, component, severity)
                raise
        return wrapper
    return decorator
